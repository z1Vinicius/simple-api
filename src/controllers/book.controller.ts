import bookModel from "../infra/models/book";
import { Request, Response } from "express"; // Importe os tipos Request e Response

class BookController{
  static async getBooks(req: Request, res: Response): Promise<void>{
    try{
      const allBooks = await bookModel.find({})
      res.status(200).json(allBooks)
    }
    catch(error){
      res.status(500).json({message: `Error get all books - ${error.message}`})
    }
  }
  
  static async getBook(req: Request, res: Response): Promise<void>{
    try{
      const bookId = req.params.id
      const book = await bookModel.findById(bookId)
      res.status(200).json(book)
    }
    catch(error){
      res.status(500).json({message: `Error get book - ${error.message}`})
    }
  }
  
  static async createBook(req: Request, res: Response): Promise<void>{
    try{
      const book = await bookModel.create(req.body)
      res.status(200).json(book)
    } catch(error){
      res.status(500).json({message: `Error to create book - ${error.message}`})
    }
  }
  
  static async updateBook(req: Request, res: Response): Promise<void>{
    try{
      const bookId = req.params.id
      const book = await bookModel.findByIdAndUpdate(bookId, req.body)
      res.status(200).json(book)
    } catch(error){
      res.status(500).json({message: `Error to update book - ${error.message}`})
    }
  }
}

export default BookController;