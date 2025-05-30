"use node";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";
import { Id } from "./_generated/dataModel";

const adminEmail = "filmbythomas@gmail.com"; // Replace with actual admin email if needed

// Theme colors for email
const themeColors = {
  primary: '#2E7D32',       // Forest Green
  secondary: '#8FBC8F',     // Moss Green
  textPrimary: '#5D4037',   // Deep Brown
  textSecondary: '#795548', // Lighter Brown (Added this)
  background: '#D9CBB6',    // Warm Beige
  surface: '#F5F5F0',       // Off-White
  textOnDark: '#E8E0D4',
  accent: '#A1887F',        // Earthy Brown/Taupe
};

export const sendBookingConfirmationEmail = internalAction({
  args: {
    bookingId: v.id("bookings"),
    name: v.string(),
    email: v.string(), 
    tier: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const runtimeResendApiKey = process.env.CONVEX_RESEND_API_KEY;
    if (!runtimeResendApiKey || runtimeResendApiKey.startsWith("re_placeholder")) {
        console.error("CRITICAL: Actual CONVEX_RESEND_API_KEY not available at runtime for booking confirmation.");
        return { success: false, error: "Email service (API key) not configured at runtime." };
    }
    const runtimeResend = new Resend(runtimeResendApiKey);
    
    const { name, email, tier, category } = args;
    const subject = "Your Photography Booking Request Received!";
    // Ensure YOUR_DEPLOYMENT_URL is replaced with the actual URL if you use the logo in email.
    // For now, I'll remove the logo from email to avoid deployment issues if the URL isn't set.
    const htmlBody = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: ${themeColors.textPrimary}; background-color: ${themeColors.surface}; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; border: 1px solid ${themeColors.secondary};">
        <h1 style="color: ${themeColors.primary}; font-size: 24px; margin-bottom: 15px; text-align: center;">Thank You, ${name}!</h1>
        <p style="font-size: 16px; margin-bottom: 10px;">We've received your booking request for the <strong>${tier}</strong> package in the <strong>${category}</strong> category.</p>
        <p style="font-size: 16px; margin-bottom: 10px;">We're excited about the possibility of working with you! We'll review your request and get back to you as soon as possible to confirm details and availability.</p>
        <p style="font-size: 16px; margin-bottom: 20px;">If you have any urgent questions, feel free to reply to this email or contact us via Instagram <a href="https://www.instagram.com/eyesofteee" style="color: ${themeColors.primary}; text-decoration: none; font-weight: bold;">@eyesofteee</a>.</p>
        <hr style="border: none; border-top: 1px solid ${themeColors.secondary}; margin: 20px 0;"/>
        <p style="font-size: 14px; color: ${themeColors.textSecondary};">Best regards,</p>
        <p style="font-size: 16px; font-weight: bold; color: ${themeColors.primary}; margin-top: 5px;">The Eyes Of T Team</p>
      </div>
    `;

    try {
      const { data, error } = await runtimeResend.emails.send({
        from: "Eyes Of T Booking <booking@convexchef.app>", 
        to: [email], 
        subject: subject,
        html: htmlBody,
      });
      if (error) { console.error("Failed to send confirmation email:", JSON.stringify(error)); return { success: false, error: error.message }; }
      console.log("Confirmation email sent successfully:", data);
      return { success: true, data };
    } catch (e: any) { console.error("Exception sending confirmation email:", e.message); return { success: false, error: e.message }; }
  },
});

export const sendBookingNotificationEmailToAdmin = internalAction({
  args: {
    bookingId: v.id("bookings"), name: v.string(), email: v.string(), tier: v.string(), category: v.string(),
    sportDetails: v.optional(v.string()), portraitDetails: v.optional(v.string()), extraInfo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const runtimeResendApiKey = process.env.CONVEX_RESEND_API_KEY;
    if (!runtimeResendApiKey || runtimeResendApiKey.startsWith("re_placeholder")) {
        console.error("CRITICAL: Actual CONVEX_RESEND_API_KEY not available at runtime for admin notification.");
        return { success: false, error: "Email service (API key) not configured at runtime." };
    }
    const runtimeResend = new Resend(runtimeResendApiKey);
        
    const { name, email, tier, category, sportDetails, portraitDetails, extraInfo, bookingId } = args;
    const subject = `New Booking Request: ${name} - ${tier} (${category})`;
    let detailsHtml = `<p style="font-size: 16px; margin-bottom: 5px;"><strong>Booking ID:</strong> ${bookingId}</p>`;
    if (category === "Athletics" && sportDetails) { detailsHtml += `<p style="font-size: 16px; margin-bottom: 5px;"><strong>Sport Details:</strong> ${sportDetails}</p>`; }
    if (category === "Portraits" && portraitDetails) { detailsHtml += `<p style="font-size: 16px; margin-bottom: 5px;"><strong>Portrait Ideas:</strong> ${portraitDetails}</p>`; }
    if (extraInfo) { detailsHtml += `<p style="font-size: 16px; margin-bottom: 5px;"><strong>Additional Info:</strong> ${extraInfo}</p>`; }

    const htmlBody = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: ${themeColors.textPrimary}; background-color: ${themeColors.surface}; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; border: 1px solid ${themeColors.secondary};">
        <h1 style="color: ${themeColors.primary}; font-size: 24px; margin-bottom: 15px; text-align: center;">New Booking Request!</h1>
        <p style="font-size: 16px; margin-bottom: 15px;">You've received a new booking request with the following details:</p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
          <li style="font-size: 16px; margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
          <li style="font-size: 16px; margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: ${themeColors.primary}; text-decoration: none; font-weight: bold;">${email}</a></li>
          <li style="font-size: 16px; margin-bottom: 8px;"><strong>Category:</strong> ${category}</li>
          <li style="font-size: 16px; margin-bottom: 8px;"><strong>Tier:</strong> ${tier}</li>
        </ul>
        ${detailsHtml}
        <p style="font-size: 16px; margin-top: 20px;">Please follow up with them soon!</p>
        <hr style="border: none; border-top: 1px solid ${themeColors.secondary}; margin: 20px 0;"/>
        <p style="font-size: 14px; color: ${themeColors.textSecondary};"><em>This is an automated notification.</em></p>
      </div>
    `;
    
    try {
      const { data, error } = await runtimeResend.emails.send({
        from: "Booking System <notify@convexchef.app>", 
        to: [adminEmail], 
        subject: subject,
        html: htmlBody,
      });
      if (error) { console.error("Failed to send admin notification email:", JSON.stringify(error)); return { success: false, error: error.message }; }
      console.log("Admin notification email sent successfully:", data);
      return { success: true, data };
    } catch (e: any) { console.error("Exception sending admin notification email:", e.message); return { success: false, error: e.message }; }
  },
});
