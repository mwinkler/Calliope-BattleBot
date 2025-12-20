function updateMotorSpeed () {
    if (auto_steer_mode) {
        auto_speed = joy_y
        if (linesensor_l && !(linesensor_r)) {
            // Left sensor on line - turn right
            setMotorSpeed(maqueen.Motors.M1, 0)
            setMotorSpeed(maqueen.Motors.M2, auto_speed)
        } else if (!(linesensor_l) && linesensor_r) {
            // Right sensor on line - turn left
            setMotorSpeed(maqueen.Motors.M1, auto_speed)
            setMotorSpeed(maqueen.Motors.M2, 0)
        } else {
            // Neither sensor on line - go straight slowly
            setMotorSpeed(maqueen.Motors.M1, auto_speed)
            setMotorSpeed(maqueen.Motors.M2, auto_speed)
        }
    } else {
        setMotorSpeed(maqueen.Motors.M1, joy_y + joy_x)
        setMotorSpeed(maqueen.Motors.M2, joy_y - joy_x)
    }
}
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
    if (receivedString == "b_16_on") {
        maqueen.servoRun(maqueen.Servos.S1, gripper_open ? 100 : 30)
        gripper_open = !(gripper_open)
    } else if (receivedString == "b_14_on") {
        auto_steer_mode = !(auto_steer_mode)
        maqueen.setColor(auto_steer_mode ? 0xff8000 : 0x000000)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "j_x") {
        lcd16x2rgb.setCursor(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0)
        lcd16x2rgb.writeLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), "x: " + value + " ir: " + maqueen.irRead())
        joy_x = mapJoy(value, 520, 540, 0, 1023)
    }
    if (name == "j_y") {
        lcd16x2rgb.setCursor(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0)
        lcd16x2rgb.writeLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), "y: " + value + "   ")
        joy_y = mapJoy(value, 460, 510, 0, 980)
    }
    updateMotorSpeed()
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
let joy_x = 0
let linesensor_r = false
let linesensor_l = false
let joy_y = 0
let auto_speed = 0
let auto_steer_mode = false
let gripper_open = false
lcd16x2rgb.initRGB(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5), false)
lcd16x2rgb.setRGB1(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5), 0xff00ff)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), false)
lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
maqueen.motorStop(maqueen.Motors.All)
maqueen.servoRun(maqueen.Servos.S1, 100)
maqueen.setColor(0xff0000)
radio.setGroup(24)
basic.forever(function () {
    if (auto_steer_mode) {
        linesensor_l = maqueen.readPatrol(maqueen.Patrol.PatrolLeft, maqueen.Brightness.Dark)
        linesensor_r = maqueen.readPatrol(maqueen.Patrol.PatrolRight, maqueen.Brightness.Dark)
        updateMotorSpeed()
    }
    basic.pause(50)
})
