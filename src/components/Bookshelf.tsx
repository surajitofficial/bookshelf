import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Theme, styled } from "@mui/material/styles";

import Book from "./Book";
import { useLocalStorage } from "../hooks/useLocalStorage";
import BookFilter from "./BookFilter";
import initialBooks from "../api/InitialBooksData";
import { BookData } from "../types/types";

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
    width: "100%", // Full width on smaller screens//
  },
  width: "240px", // Default width for larger screens
  height: "60px", // Default height for all screens
}));

const Bookshelf: React.FC = () => {
  const [books, setBooks] = useLocalStorage<BookData[]>(
    "bookshelf",
    initialBooks
  );
  const [newBook, setNewBook] = useState<BookData>({
    id: 0,
    title: "",
    author: "",
    description: "",
    coverUrl: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    number | null
  >(null);

  const handleAddBook = () => {
    if (
      newBook.title &&
      newBook.author &&
      newBook.description &&
      newBook.coverUrl
    ) {
      const newBookWithId = {
        ...newBook,
        id: Date.now(),
      };
      setBooks([...books, newBookWithId]);
      setNewBook({
        id: 0,
        title: "",
        author: "",
        description: "",
        coverUrl: "",
      });
      setIsModalOpen(false);
    }
  };

  const handleDeleteBook = (id: number) => {
    setDeleteConfirmationId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmationId) {
      setBooks(books.filter((book) => book.id !== deleteConfirmationId));
      setDeleteConfirmationId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  const handleEditBook = (
    id: number,
    editedTitle: string,
    editedAuthor: string,
    editedDescription: string,
    editedCoverUrl: string
  ) => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? {
            ...book,
            title: editedTitle,
            author: editedAuthor,
            description: editedDescription,
            coverUrl: editedCoverUrl,
          }
        : book
    );
    setBooks(updatedBooks);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof BookData
  ) => {
    setNewBook({
      ...newBook,
      [field]: e.target.value,
    });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static" color="primary">
        <HeaderToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bookshelf Application
          </Typography>
        </HeaderToolbar>
      </AppBar>
      <Box m={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <BookFilter onFilterChange={handleFilterChange} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <AddButton
              variant="contained"
              color="success"
              onClick={() => setIsModalOpen(true)}
            >
              Add Book
            </AddButton>
          </Grid>
        </Grid>
      </Box>
      <div>
        <Grid container spacing={2}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Book
                title={book.title}
                author={book.author}
                description={book.description}
                coverUrl={book.coverUrl}
                onDelete={() => handleDeleteBook(book.id)}
                onEdit={(editedTitle, editedAuthor, editedDescription, editedCoverUrl) =>
                  handleEditBook(book.id, editedTitle, editedAuthor, editedDescription, editedCoverUrl)
                }
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Add New Book
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={newBook.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "title")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                value={newBook.author}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "author")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={newBook.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "description")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cover URL"
                value={newBook.coverUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, "coverUrl")
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBook}
              >
                Add Book
              </Button>
              <Button variant="contained" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Dialog open={!!deleteConfirmationId} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Bookshelf;
