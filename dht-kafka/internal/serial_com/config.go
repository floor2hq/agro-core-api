package serial_com

import (
	"time"
	"github.com/tarm/serial"
)

var Config = &serial.Config{
	Name:        "COM1",
	Baud:        9600,
	ReadTimeout: time.Second * 2,
}
