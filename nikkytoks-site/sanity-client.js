/**
 * NIKKYTOKS VENTURES — Sanity CMS Client & Synchronizer
 * 
 * Zero-dependency GROQ API client for Node.js & browser runtimes.
 * Automatically activates when SANITY_PROJECT_ID is provided.
 */

const https = require('https');

class SanityClient {
  constructor(config = {}) {
    this.projectId = config.projectId || process.env.SANITY_PROJECT_ID;
    this.dataset = config.dataset || process.env.SANITY_DATASET || 'production';
    this.apiVersion = config.apiVersion || 'v2023-08-01';
    this.token = config.token || process.env.SANITY_API_TOKEN;
    this.useCdn = config.useCdn !== false;
  }

  isConfigured() {
    return Boolean(this.projectId && this.dataset);
  }

  /**
   * Execute a GROQ Query against Sanity API
   */
  async fetch(query, params = {}) {
    if (!this.isConfigured()) {
      throw new Error('Sanity is not configured. Please set SANITY_PROJECT_ID.');
    }

    const host = this.useCdn 
      ? `${this.projectId}.apicdn.sanity.io`
      : `${this.projectId}.api.sanity.io`;

    const encodedQuery = encodeURIComponent(query);
    const path = `/${this.apiVersion}/data/query/${this.dataset}?query=${encodedQuery}`;

    const headers = {
      'Accept': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return new Promise((resolve, reject) => {
      const req = https.request({
        host,
        path,
        method: 'GET',
        headers
      }, res => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(raw);
            if (res.statusCode >= 400) {
              return reject(new Error(data.message || `Sanity Error ${res.statusCode}`));
            }
            resolve(data.result);
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  /**
   * Fetch all products formatted for the NikkyToks site
   */
  async getProducts() {
    const groq = `*[_type == "product"] | order(_createdAt desc) {
      "id": _id,
      name,
      category,
      brand,
      description,
      specs,
      "image": image.asset->url,
      icon,
      featured,
      available
    }`;
    return this.fetch(groq);
  }

  /**
   * Fetch site & corporate settings
   */
  async getSettings() {
    const groq = `*[_type == "siteSettings"][0] {
      whatsapp,
      phone,
      phone2,
      email,
      hours,
      head,
      branch
    }`;
    return this.fetch(groq);
  }
}

module.exports = SanityClient;
