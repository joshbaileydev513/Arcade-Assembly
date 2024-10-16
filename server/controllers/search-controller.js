function clean(d) {
    if (!Array.isArray(d)) {
        throw new TypeError('Expected an array but received ' + typeof d);
    }
    
    d.forEach(i => {
        // Check if the cover image is available and convert the image_id to a URL for a larger image
        if (i.cover && i.cover.image_id) {
            i.cover = `//images.igdb.com/igdb/image/upload/t_720p/${i.cover.image_id}.jpg`;
        }
        // Change first_release_date to date
        Object.assign(i, { date: i.first_release_date, igdb: i.id.toString() });
        delete i['first_release_date'];
        delete i['id'];
    });
    
    return d;
}

module.exports = {
    async searchGames(req, res) {
        try {
            let result = await fetch(
                "https://api.igdb.com/v4/games",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': process.env.CLIENT_ID,
                        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    },
                    body: `search "${req.params.query}"; fields cover.image_id, first_release_date, name; where game_modes = (2);`
                }
            ).then(async (r) => {
                if (!r.ok) {
                    const errorData = await r.json();
                    throw new Error(`IGDB API Error: ${JSON.stringify(errorData)}`);
                }
                let data = await r.json();
                return Array.isArray(data) ? clean(data) : data;
            });

            res.json(result);
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({ error: err.message });
        }
    }
}
