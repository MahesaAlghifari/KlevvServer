import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice } = request.body;

    // Validasi data (contoh sederhana)
    if (!name || !gender || !placeOfBirth || !city || !idCardNumber || !headline || !phone || !address || !invoice) {
      return response.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Menyimpan data ke database
      await sql`
        INSERT INTO FormData (name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice)
        VALUES (${name}, ${gender}, ${placeOfBirth}, ${city}, ${idCardNumber}, ${headline}, ${phone}, ${address}, ${invoice})
      `;
      return response.status(200).json({ message: 'Data successfully saved' });
    } catch (error) {
      console.error('Database insert error:', error); // Tambahkan logging untuk membantu debugging
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return response.status(405).json({ message: 'Method not allowed' });
  }
}
