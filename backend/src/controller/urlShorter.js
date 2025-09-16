import { nextPrime } from "../utils/primes.js"
import { hashUrl } from "../utils/hashUrl.js"
import Url from "../model/urlShorterModel.js"

export const shortenUrl = async (req, res) => {
    // console.log(req.body);
    const { longUrl } = req.body
    if (!longUrl) return res.status(400).json({ message: "Long URL required" })

    const already = await Url.findOne({ longUrl });
    if (already) {
      return res.json({ shortCode: already.shortCode, longUrl: already.longUrl });
    }
    
    const count = await Url.countDocuments()
    let L = nextPrime(count)
    const base62 = hashUrl(longUrl)
    let short = base62.slice(0, L)
    let existing;
    let attempts = 0
    while (attempts < 10) {
      existing = await Url.findOne({ shortCode: short })

      if (!existing) break; 
      if (existing.longUrl === longUrl) {
        return res.json({ shortCode: existing.shortCode })
      }
      L = nextPrime(L)
      short = base62.slice(0, L)
      attempts++;
    }
    if (attempts === 10) {
      return res.status(500).json({ message: "Collision limit reached" });
    }
    const newUrl = await Url.create({ longUrl, shortCode: short });
    res.json({ shortCode: newUrl.shortCode ,longUrl});
};


export const redirectUrl = async (req, res) => {
    const { code } = req.params;
    console.log(code);
    
    const found = await Url.findOne({ shortCode: code });
    if (!found) return res.status(404).json({ message: "Not found" });
    res.redirect(found.longUrl);
};
