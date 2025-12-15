function setMotorSpeed (motor: number, speed: number) {
    if (speed > 0) {
        maqueen.motorRun(motor, maqueen.Dir.CW, speed)
    } else if (speed < 0) {
        maqueen.motorRun(motor, maqueen.Dir.CCW, speed * -1)
    } else {
        maqueen.motorStop(motor)
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "b_1_on") {
    	
    } else if (receivedString == "b_16_on") {
        maqueen.servoRun(maqueen.Servos.S1, 30)
    } else if (receivedString == "b_14_on") {
        maqueen.servoRun(maqueen.Servos.S1, 100)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "j_x") {
        lcd16x2rgb.setCursor(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0)
        lcd16x2rgb.writeLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), "x: " + value + "   ")
        joy_x = mapJoy(value, 520, 540, 0, 1023)
    }
    if (name == "j_y") {
        lcd16x2rgb.setCursor(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0)
        lcd16x2rgb.writeLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), "y: " + value + "   ")
        joy_y = mapJoy(value, 460, 510, 0, 980)
    }
    setMotorSpeed(maqueen.Motors.M1, joy_y + joy_x)
    setMotorSpeed(maqueen.Motors.M2, joy_y - joy_x)
})
function mapJoy (value: number, deadzone_low: number, deadzone_high: number, lowest: number, highest: number) {
    if (value > deadzone_high) {
        return Math.map(value, deadzone_high, highest, 0, 125)
    }
    if (value < deadzone_low) {
        return Math.map(value, deadzone_low, lowest, 0, -125)
    }
    return 0
}
let joy_y = 0
let joy_x = 0
lcd16x2rgb.initRGB(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5), true)
lcd16x2rgb.setRGB1(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5), 0xff00ff)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), true)
lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
maqueen.motorStop(maqueen.Motors.All)
radio.setGroup(24)
basic.forever(function () {
	
})
