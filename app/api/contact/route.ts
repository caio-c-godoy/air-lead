
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_TO || 'ev.victoriuscom@gmail.com'
  const from = process.env.CONTACT_FROM || `Victorious Site <no-reply@victoriouscomp.com>`

  if(!host || !user || !pass){
    return NextResponse.json({ ok: false, error: 'SMTP not configured' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({ host, port, secure: port===465, auth: { user, pass } })
  await transporter.sendMail({
    from, to,
    subject: 'Novo lead - Victorious AC',
    replyTo: email || undefined,
    text: `Nome: ${name}\nTelefone: ${phone}\nE-mail: ${email}\nMensagem: ${message || ''}`,
    html: `<h2>Novo lead - Victorious AC</h2>
           <p><b>Nome:</b> ${name}</p>
           <p><b>Telefone:</b> ${phone}</p>
           <p><b>E-mail:</b> ${email}</p>
           <p><b>Mensagem:</b><br/>${message || ''}</p>`
  })

  return NextResponse.json({ ok: true })
}
