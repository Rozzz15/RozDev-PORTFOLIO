/**
 * Google Apps Script - Contact Form Handler for Rozel Ramos Portfolio
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete any default code and paste this entire script
 * 4. Save the project (Ctrl+S), name it "Contact Form Handler"
 * 5. Deploy: Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and update it in src/App.tsx
 */

// ============ CONFIGURATION ============
const RECIPIENT_EMAIL = "rozelramos17@gmail.com";
const SHEET_ID = "1rfiFnvyv0nHXIifm48MRxngl7wjW9UGYnSio1qoM1uo";
const SHEET_NAME = "Contact Submissions";
// =======================================

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Contact form endpoint is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return jsonResponse(400, "Name, email, and message are required.");
    }

    // Save to Google Sheet
    saveToSheet(data);

    // Send notification email to you
    sendNotification(data);

    // Send auto-reply to the person who submitted
    sendAutoReply(data);

    return jsonResponse(200, "Inquiry sent successfully!");
  } catch (err) {
    return jsonResponse(500, "Server error: " + err.message);
  }
}

function saveToSheet(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Email",
      "Company",
      "Project Type",
      "Budget",
      "Message"
    ]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#A78873");
    headerRange.setFontColor("#171614");

    // Set column widths
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 200);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 150);
    sheet.setColumnWidth(6, 120);
    sheet.setColumnWidth(7, 400);
  }

  // Append the new submission
  sheet.appendRow([
    new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }),
    data.name,
    data.email,
    data.company || "N/A",
    data.projectType || "N/A",
    data.budget || "N/A",
    data.message
  ]);
}

function sendNotification(data) {
  const subject = "New Portfolio Inquiry from " + data.name;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background: #0f0e0c; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #0f0e0c;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%;">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1c1a17 0%, #171614 100%); padding: 40px; border-radius: 8px 8px 0 0; border-bottom: 1px solid rgba(167,136,115,0.2);">
                  <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4em; color: rgba(167,136,115,0.6);">New Inquiry</p>
                  <h1 style="margin: 12px 0 0; font-size: 24px; font-weight: 300; color: #F5F2EE; letter-spacing: -0.02em;">
                    From <span style="color: #A78873;">${data.name}</span>
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="background: #171614; padding: 40px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 14px 0; border-bottom: 1px solid rgba(245,242,238,0.06);">
                        <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(167,136,115,0.5);">Email</p>
                        <p style="margin: 6px 0 0; font-size: 14px; color: #F5F2EE;">
                          <a href="mailto:${data.email}" style="color: #A78873; text-decoration: none;">${data.email}</a>
                        </p>
                      </td>
                    </tr>
                    ${data.company ? `
                    <tr>
                      <td style="padding: 14px 0; border-bottom: 1px solid rgba(245,242,238,0.06);">
                        <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(167,136,115,0.5);">Company</p>
                        <p style="margin: 6px 0 0; font-size: 14px; color: #F5F2EE;">${data.company}</p>
                      </td>
                    </tr>` : ''}
                    ${data.projectType ? `
                    <tr>
                      <td style="padding: 14px 0; border-bottom: 1px solid rgba(245,242,238,0.06);">
                        <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(167,136,115,0.5);">Project Type</p>
                        <p style="margin: 6px 0 0; font-size: 14px; color: #F5F2EE;">${data.projectType}</p>
                      </td>
                    </tr>` : ''}
                    ${data.budget ? `
                    <tr>
                      <td style="padding: 14px 0; border-bottom: 1px solid rgba(245,242,238,0.06);">
                        <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(167,136,115,0.5);">Budget</p>
                        <p style="margin: 6px 0 0; font-size: 14px; color: #F5F2EE;">${data.budget}</p>
                      </td>
                    </tr>` : ''}
                  </table>

                  <!-- Message -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="background: rgba(245,242,238,0.03); border-left: 3px solid #A78873; padding: 20px;">
                        <p style="margin: 0 0 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(167,136,115,0.6);">Message</p>
                        <p style="margin: 0; font-size: 14px; color: rgba(245,242,238,0.6); line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #0f0e0c; padding: 24px 40px; border-radius: 0 0 8px 8px; border-top: 1px solid rgba(245,242,238,0.04);">
                  <p style="margin: 0; font-size: 11px; color: rgba(245,242,238,0.2); text-align: center;">
                    Sent from your portfolio contact form
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  GmailApp.sendEmail(RECIPIENT_EMAIL, subject, "New inquiry from " + data.name + " (" + data.email + "): " + data.message, {
    htmlBody: htmlBody,
    name: "Portfolio Contact Form",
    replyTo: data.email
  });
}

function sendAutoReply(data) {
  const subject = "Thanks for reaching out, " + data.name + "!";
  const firstName = data.name.split(" ")[0];

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background: #0f0e0c; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #0f0e0c;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%;">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1c1a17 0%, #171614 100%); padding: 50px 40px; border-radius: 8px 8px 0 0; border-bottom: 1px solid rgba(167,136,115,0.2);">
                  <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4em; color: rgba(167,136,115,0.6);">Rozel Ramos</p>
                  <h1 style="margin: 12px 0 0; font-size: 28px; font-weight: 300; color: #F5F2EE; letter-spacing: -0.02em; line-height: 1.3;">
                    Thank you, <span style="color: #A78873;">${firstName}</span>
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="background: #171614; padding: 40px;">
                  <p style="margin: 0; font-size: 15px; color: rgba(245,242,238,0.7); line-height: 1.8;">
                    Your message has been received. I appreciate you taking the time to reach out${data.projectType ? ' about your <strong style="color: #A78873;">' + data.projectType + '</strong> project' : ''}.
                  </p>

                  <p style="margin: 20px 0 0; font-size: 15px; color: rgba(245,242,238,0.7); line-height: 1.8;">
                    I'll review the details and get back to you within <strong style="color: #F5F2EE;">24 hours</strong>.
                  </p>

                  <!-- Message Card -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0;">
                    <tr>
                      <td style="background: rgba(245,242,238,0.03); border-left: 3px solid #A78873; padding: 24px;">
                        <p style="margin: 0 0 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(167,136,115,0.6);">Your Message</p>
                        <p style="margin: 0; font-size: 14px; color: rgba(245,242,238,0.55); line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- CTA Button -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 35px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="background: #A78873; border-radius: 2px;">
                              <a href="https://calendly.com/rozelramos17/30min" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #171614; text-decoration: none;">Schedule a Discovery Call</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="padding: 0 0 30px;">
                        <div style="height: 1px; background: rgba(245,242,238,0.06);"></div>
                      </td>
                    </tr>
                  </table>

                  <!-- Signature -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td>
                        <p style="margin: 0; font-size: 13px; color: rgba(245,242,238,0.35);">Best regards</p>
                        <p style="margin: 12px 0 0; font-size: 15px; font-weight: 600; color: #F5F2EE;">Rozel O. Ramos</p>
                        <p style="margin: 4px 0 0; font-size: 12px; color: #A78873; letter-spacing: 0.05em;">Digital Systems Architect</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #0f0e0c; padding: 30px 40px; border-radius: 0 0 8px 8px; border-top: 1px solid rgba(245,242,238,0.04);">
                  <p style="margin: 0; font-size: 11px; color: rgba(245,242,238,0.2); text-align: center;">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rozelramos17@gmail.com" style="color: rgba(167,136,115,0.5); text-decoration: none;">rozelramos17@gmail.com</a>
                    <span style="margin: 0 8px; color: rgba(245,242,238,0.1);">|</span>
                    <a href="tel:+639166219195" style="color: rgba(167,136,115,0.5); text-decoration: none;">+63 916 621 9195</a>
                  </p>
                  <p style="margin: 12px 0 0; font-size: 10px; color: rgba(245,242,238,0.15); text-align: center;">
                    This is an automated reply. For anything else, feel free to email me directly.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  GmailApp.sendEmail(data.email, subject, "Hi " + firstName + ",\n\nThank you for reaching out! I've received your message and will get back to you within 24 hours.\n\nBest regards,\nRozel O. Ramos\nDigital Systems Architect\nrozelramos17@gmail.com | +63 916 621 9195", {
    htmlBody: htmlBody,
    name: "Rozel Ramos"
  });
}

function jsonResponse(statusCode, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: statusCode, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
