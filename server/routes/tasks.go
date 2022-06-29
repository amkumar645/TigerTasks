package routes

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"server/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var validate = validator.New()
var taskCollection *mongo.Collection = OpenCollection(Client, "tasks")

// Add Task
func AddTask(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var task models.Task

	if err := c.BindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validationErr := validate.Struct(task)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		return
	}
	task.ID = primitive.NewObjectID()

	result, insertErr := taskCollection.InsertOne(ctx, task)
	if insertErr != nil {
		msg := "There was an error creating the task."
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, result)
}

// Get all tasks
func GetTasks(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()

	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get all tasks in a certain category
func GetTasksByCategory(c *gin.Context) {
	category := c.Params.ByName("category")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{"category": category})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get all tasks with the search filter in the title (check if this works with multiple word filters)
func GetTasksByTitle(c *gin.Context) {
	filter := c.Params.ByName("filter")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{
		"title": bson.M{"$regex": filter, "$options": "im"},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get all tasks with the search filter in the title and the correct category
func GetTasksByTitleAndCategory(c *gin.Context) {
	filter := c.Params.ByName("filter")
	category := c.Params.ByName("category")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{
		"title":    bson.M{"$regex": filter, "$options": "im"},
		"category": category,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get all tasks created by user
func GetCreatedTasksByUser(c *gin.Context) {
	user := c.Params.ByName("user")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{"createdby": user})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get all tasks flagged by user
func GetFlaggedTasksByUser(c *gin.Context) {
	user := c.Params.ByName("user")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{
		"flaggedby": bson.M{"$all": bson.A{user}},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get all tasks requested by user
func GetRequestedTasksByUser(c *gin.Context) {
	user := c.Params.ByName("user")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var tasks []bson.M
	cursor, err := taskCollection.Find(ctx, bson.M{
		"requestedby": bson.M{"$all": bson.A{user}},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(tasks)
	c.JSON(http.StatusOK, tasks)
}

// Get a task by its ID
func GetTaskById(c *gin.Context) {
	taskID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(taskID)
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var task bson.M
	if err := taskCollection.FindOne(ctx, bson.M{"_id": docID}).Decode(&task); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	fmt.Println(task)
	c.JSON(http.StatusOK, task)
}

// Update a task
func UpdateTask(c *gin.Context) {
	taskID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(taskID)
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var task models.Task
	if err := c.BindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	validationErr := validate.Struct(task)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		return
	}

	result, err := taskCollection.ReplaceOne(
		ctx,
		bson.M{"_id": docID},
		bson.M{
			"title":       task.Title,
			"description": task.Description,
			"skills":      task.Skills,
			"category":    task.Category,
			"price":       task.Price,
			"deadline":    task.Deadline,
			"email":       task.Email,
			"phone":       task.Phone,
			"createdby":   task.CreatedBy,
			"flaggedby":   task.FlaggedBy,
			"requestedby": task.RequestedBy,
		},
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer cancel()
	c.JSON(http.StatusOK, result.ModifiedCount)
}

// Delete a given task by ID
func DeleteTask(c *gin.Context) {
	taskID := c.Params.ByName("id")
	docID, _ := primitive.ObjectIDFromHex(taskID)
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	result, err := taskCollection.DeleteOne(ctx, bson.M{"_id": docID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cancel()
	c.JSON(http.StatusOK, result.DeletedCount)
}
