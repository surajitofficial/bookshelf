import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  DialogContent,
} from "@mui/material";

interface BookProps {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  onDelete: () => void;
  onEdit: (
    editedTitle: string,
    editedAuthor: string,
    editedDescription: string,
    editedCoverUrl:string
  ) => void;
}

const Book: React.FC<BookProps> = ({
  title,
  author,
  description,
  coverUrl,
  onDelete,
  onEdit,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [editedDescription, setEditedDescription] = useState(description);
  
  const [editedCoverUrl, setEditedCoverUrl] = useState(coverUrl);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditSave = () => {
    // Call the onEdit prop function to update the book details
    onEdit(editedTitle, editedAuthor, editedDescription, editedCoverUrl);
    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    // Reset the edited details and close the edit dialog
    setEditedTitle(title);
    setEditedAuthor(author);
    setEditedDescription(description);
    setIsEditOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={coverUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleEditClick}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
      <Dialog open={isEditOpen} onClose={handleEditCancel}>
        <DialogTitle>Edit Book Details</DialogTitle>
        <DialogContent sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <TextField
            fullWidth
            label="Author"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
           <TextField
            fullWidth
            label="Description"
            value={editedCoverUrl}
            onChange={(e) => setEditedCoverUrl(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Book;
