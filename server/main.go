package main

import (
	"os"

	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(cors.Default())

	// these are the endpoints
	//Create
	router.POST("/task/create", routes.AddTask)
	//Read
	router.GET("/users/created/:user", routes.GetCreatedTasksByUser)
	router.GET("/users/flagged/:user", routes.GetFlaggedTasksByUser)
	router.GET("/tasks", routes.GetTasks)
	router.GET("/task/:id/", routes.GetTaskById)
	router.GET("/tasks/category/:category/", routes.GetTasksByCategory)
	router.GET("/tasks/title/:filter/", routes.GetTasksByTitle)
	router.GET("/tasks/search/:category/:filter", routes.GetTasksByTitleAndCategory)
	//Update
	router.PUT("/task/update/:id", routes.UpdateTask)
	//Delete
	router.DELETE("/task/delete/:id", routes.DeleteTask)

	//this runs the server and allows it to listen to requests.
	router.Run(":" + port)
}
