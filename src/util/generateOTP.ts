function generateNumericOTP(length = 6) {
    let otp = '';

    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }

    return otp;
}

// Example usage:
const numericOtp = generateNumericOTP();
console.log("Generated Numeric OTP:", numericOtp);
export default generateNumericOTP;