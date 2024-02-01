package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/floor2hq/agro-core-api/dht-kafka/internal/kafka"
	"github.com/floor2hq/agro-core-api/dht-kafka/internal/serial_com"
	"github.com/floor2hq/agro-core-api/dht-kafka/internal/ws"
	"github.com/gorilla/mux"
	"github.com/tarm/serial"
)

func main() {

	var wg sync.WaitGroup
	serialToKafkaChannel := make(chan string)
	wg.Add(1)

	port, err := serial.OpenPort(serial_com.Config)
	if err != nil {
		log.Fatal(err)
	}
	defer port.Close()
	buffer := make([]byte, 128)

	go func() {
		for {
			n, err := port.Read(buffer)
			if err != nil {
				log.Fatal(err)
			}
			data := string(buffer[:n])
			fmt.Printf("Read %d bytes: %s\n", n, data)

			serialToKafkaChannel <- data

			kafka.PushToKafka("dht-data", string(buffer[:n]))
			time.Sleep(time.Millisecond * 500)
		}
	}()

	// kafka.Consumer("dht-data")

	r := mux.NewRouter()

	r.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		ws.HandleWebSocket(w, r, serialToKafkaChannel)
	})

	px := 8080
	fmt.Printf("WebSocket server running on :%d...\n", px)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", px), r))

	wg.Wait()
}
