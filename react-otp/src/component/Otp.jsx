import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const OTP = ({ otpLength }) => {
    const [otpField, setOtpField] = useState(Array(otpLength).fill(null));
    const inputRef = useRef([]);

    const handleChange = (e, index) => {
        const key = e.key;
        if(key === 'Enter') {
            console.log('submit', otpField.join());
        }
        if(key === 'ArrowLeft') {
            if(index > 0) {
                inputRef.current[index - 1].focus();
            }
            return;
        }
        if(key === 'ArrowRight') {
            if(index < otpLength - 1) {
                inputRef.current[index + 1].focus();
            }
            return;
        }
        if(key === 'Backspace') {
            const oldValue = [...otpField];
            oldValue[index] = '';
            setOtpField(oldValue);
            if(index > 0) {
                inputRef.current[index - 1].focus();
            }
            return;
        } 
        
        if(isNaN(key)) {
            return;
        }
       

        const oldValue = [...otpField];
        oldValue[index] = key;
        setOtpField(oldValue);
            
        if(index < otpLength - 1) {
            inputRef.current[index + 1].focus();
        }
    }

    const handlePaste = (e) => {
        const value = e.clipboardData.getData('text').trim();
        if(isNaN(value)) {
            return;
        }

        const updatedValue = value.slice(0, otpLength);

        const otpValue = [...otpField];

        for(let i = 0; i < updatedValue.length; i++) {
            otpValue[i] = updatedValue[i];
            inputRef.current[i].focus();
        }
        setOtpField(otpValue);
    }

    useEffect(() => {
        inputRef.current[0].focus();
    }, [])

    return (
        <div className="otp-container">
            {
                otpField.map((_, index) => (
                    <input 
                        value={otpField[index]} 
                        ref={(currentInput) => (inputRef.current[index] = currentInput)}
                        key={index} type="text" 
                        onKeyDown={(e) => handleChange(e, index)}
                        onPaste={handlePaste}
                    />
                ))
            }
        </div>
    )
}

export default OTP;