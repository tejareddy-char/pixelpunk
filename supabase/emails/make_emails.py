# Regenerates the branded Supabase auth emails: python3 supabase/emails/make_emails.py supabase/emails
# Paste magic-link.html into Authentication → Emails → Templates → Magic Link,
# and confirm-signup.html into Confirm signup.
import sys, os
out = sys.argv[1]
rows = ['......ll......','.....lll......','....llll.l....','...kkkkkkkk...','..kppppppppk..','.kpwwppppwwpk.','.kpwbppppwbpk.','.kppppppppppk.','.kpcpmmmmpcpk.','.kpppmyympppk.','..kpppppppk...','...kkkkkkkk...','...kk....kk...','..kkk....kkk..']
col = {'l':'#c6ff3d','k':'#f5f2ff','p':'#ff3d8b','w':'#ffffff','b':'#0b0a12','c':'#ffd23d','m':'#0b0a12','y':'#3df2ff','.':'#161425'}
PX = 7
def mascot():
    trs = []
    for r in rows:
        cells, i = [], 0
        while i < len(r):
            j = i
            while j < len(r) and r[j] == r[i]: j += 1
            n = j - i
            cs = f' colspan="{n}"' if n > 1 else ''
            cells.append(f'<td{cs} width="{n*PX}" height="{PX}" bgcolor="{col[r[i]]}"></td>')
            i = j
        trs.append('<tr>' + ''.join(cells) + '</tr>')
    cols = '<tr>' + ''.join(f'<td width="{PX}" height="0"></td>' for _ in range(14)) + '</tr>'
    return f'<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:0;font-size:0;">{cols}{"".join(trs)}</table>'

def email(title, eyebrow, heading, body, button, footnote):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="supported-color-schemes" content="dark light"><title>{title}</title></head>
<body style="margin:0;padding:0;background:#0b0a12;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">{eyebrow} - {heading}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0b0a12" style="background:#0b0a12;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;">
    <tr><td align="left" style="padding:0 0 16px;font:700 18px 'Courier New',monospace;letter-spacing:2px;color:#f5f2ff;">PIXEL<span style="color:#ff3d8b;">PUNK</span></td></tr>
    <tr><td bgcolor="#161425" style="background:#161425;border:2px solid #2e2a4a;border-top:4px solid #ff3d8b;padding:32px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="center" style="padding:0 0 22px;">{mascot()}</td></tr>
        <tr><td align="center" style="font:700 12px 'Courier New',monospace;letter-spacing:3px;text-transform:uppercase;color:#c6ff3d;padding:0 0 8px;">{eyebrow}</td></tr>
        <tr><td align="center" style="font:700 26px/1.2 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;color:#f5f2ff;padding:0 0 14px;">{heading}</td></tr>
        <tr><td align="center" style="font:16px/1.6 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#a8a3c4;padding:0 0 26px;">{body}</td></tr>
        <tr><td align="center" style="padding:0 0 26px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td bgcolor="#ff3d8b" style="background:#ff3d8b;border:2px solid #0b0a12;box-shadow:4px 4px 0 #c6ff3d;">
              <a href="{{{{ .ConfirmationURL }}}}" target="_blank" style="display:inline-block;padding:14px 30px;font:700 16px 'Courier New',monospace;letter-spacing:2px;text-transform:uppercase;color:#0b0a12;text-decoration:none;"><span style="display:inline-block;width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:9px solid #0b0a12;margin-right:10px;vertical-align:0;"></span>{button}</a>
            </td></tr></table>
        </td></tr>
        <tr><td align="center" style="font:13px/1.6 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#7d789a;padding:0 0 6px;">{footnote}</td></tr>
        <tr><td align="center" style="font:12px/1.6 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#7d789a;word-break:break-all;">Button not working? Paste this into your browser:<br><a href="{{{{ .ConfirmationURL }}}}" style="color:#3df2ff;">{{{{ .ConfirmationURL }}}}</a></td></tr>
      </table>
    </td></tr>
    <tr><td align="center" style="padding:20px 8px 0;font:12px/1.6 'Courier New',monospace;color:#7d789a;">PIXELPUNK - INSERT COIN TO DESIGN<br><a href="https://pixelpunkdesigns.netlify.app" style="color:#a8a3c4;">pixelpunkdesigns.netlify.app</a></td></tr>
  </table>
</td></tr></table>
</body></html>
'''

files = {
  'magic-link.html': email('Your Pixelpunk sign-in link', 'Player 1, ready?', 'Press start to sign in',
      'Tap the button to jump back into Pixelpunk. Your favourites, high scores and kit progress are waiting.',
      'Press start', 'This link works once and expires in 1 hour. Did not ask for it? Just ignore this email.'),
  'confirm-signup.html': email('Welcome to Pixelpunk', 'New player detected', 'Create your player',
      'One click and you\'re in: save tools to your stash, sync kit checklists and climb the arcade leaderboards.',
      'Insert coin', 'This link works once and expires in 1 hour. Did not sign up? Just ignore this email.'),
}
for name, html in files.items():
    # ASCII only: symbols become HTML entities so no email client can garble them
    html = html.encode('ascii', 'xmlcharrefreplace').decode('ascii')
    open(os.path.join(out, name), 'w').write(html)
    print(name, len(html), 'bytes')
