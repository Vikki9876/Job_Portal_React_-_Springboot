package com.jobportal.utility;

public class Data {
	
	public static String getMessageBody(String otp ,String name) {
	
		return  "<!DOCTYPE html>\n" +
				"<html>\n" +
				"<head>\n" +
				"    <meta charset='UTF-8'>\n" +
				"    <title>Your OTP Code</title>\n" +
				"    <style>\n" +
				"        body { font-family: Arial, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0; }\n" +
				"        .email-container { background-color: #ffffff; max-width: 600px; margin: 40px auto; padding: 30px; border: 1px solid #dddddd; border-radius: 8px; }\n" +
				"        .header { text-align: center; padding-bottom: 20px; }\n" +
				"        .otp-code { font-size: 32px; font-weight: bold; color: #333333; text-align: center; margin: 30px 0; }\n" +
				"        .message { font-size: 16px; color: #555555; text-align: center; }\n" +
				"        .footer { text-align: center; font-size: 13px; color: #aaaaaa; margin-top: 40px; }\n" +
				"    </style>\n" +
				"</head>\n" +
				"<body>\n" +
				"    <div class='email-container'>\n" +
				"        <div class='header'>\n" +
				"            <h2>Job Portal</h2>\n" +
				"        </div>\n" +
				"        <div class='message'>\n" +
				"            <p>Hello, "+ name +"</p>\n" +
				"            <p>Here is your One-Time Password <strong>" + otp + "</strong>. Please use this to complete your login or verification process.</p>\n" +
				"        </div>\n" +
				"        <div class='otp-code'>" + otp + "</div>\n" +
				"        <div class='message'>\n" +
				"            <p>This OTP is valid for the next 10 minutes.</p>\n" +
				"            <p>If you didn’t request this, please ignore this email.</p>\n" +
				"        </div>\n" +
				"        <div class='footer'>\n" +
				"            <p>&copy; 2025 Job Portal. All rights reserved.</p>\n" +
				"        </div>\n" +
				"    </div>\n" +
				"</body>\n" +
				"</html>";

		}
}
