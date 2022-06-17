package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Task struct {
	ID          primitive.ObjectID `bson:"_id"`
	Title       *string            `json:"title"`
	Description *string            `json:"description"`
	Skills      *string            `json:"skills"`
	Category    *string            `json:"category"`
	Price       *float64           `json:"price"`
	Deadline    *string            `json:"deadline"`
	Email       *string            `json:"email"`
	Phone       *string            `json:"phone"`
	CreatedBy   *string            `json:"createdby"`
	FlaggedBy   []*string          `json:"flaggedby"`
}
