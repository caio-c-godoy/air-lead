import type { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      name,
      email,
      phone,
      address,
      plan,
      locale,
      utm,
    } = data

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const to = process.env.LEAD_TO || 'caio@4uit.us'

    await transporter.sendMail({
      from: `"Victorious Site" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject: `Novo lead — Plano: ${plan}`,
      text: `
Novo lead do site (locale: ${locale || 'n/a'})

Plano: ${plan}
Nome: ${name}
E-mail: ${email}
Telefone: ${phone}
Endereço: ${address || ''}

UTM: ${JSON.stringify(utm || {}, null, 2)}
      `,
      html: `
        <h2>Novo lead do site</h2>
        <p><b>Plano:</b> ${plan}</p>
        <p><b>Nome:</b> ${name}</p>
        <p><b>E-mail:</b> ${email}</p>
        <p><b>Telefone:</b> ${phone}</p>
        <p><b>Endereço:</b> ${address || ''}</p>
        <hr/>
        <p><b>Locale:</b> ${locale || 'n/a'}</p>
        <pre style="background:#f5f5f5;padding:8px;border-radius:6px">${JSON.stringify(utm || {}, null, 2)}</pre>
      `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err: any) {
    console.error('Lead error', err)
    return new Response(JSON.stringify({ ok: false, error: err?.message }), { status: 500 })
  }
}
