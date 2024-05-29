import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'

export class MoviesRepository {
    private prisma: PrismaClient = new PrismaClient()

    public async listAll(): Promise<Movie[]> {
        const movies = await this.prisma.movie.findMany()
        return movies
    }

    public async getById(id: number): Promise<Movie | null> {
        const movie = await this.prisma.movie.findUnique({
            where: { id: id }
        })
        return movie
    }

    public async create(title: string, director: string, releaseYear: number): Promise<Movie> {
        const movie = await this.prisma.movie.create({
            data: {
                title,
                director,
                releaseYear,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return movie
    }

    public async update(id: number, title: string, director: string, releaseYear: number): Promise<Movie | null> {
        const movie = await this.prisma.movie.update({
            where: { id: id },
            data: {
                title,
                director,
                releaseYear,
                updatedAt: new Date()
            }
        })
        return movie
    }

    public async delete(id: number): Promise<void> {
        await this.prisma.movie.delete({
            where: { id: id }
        })
    }
}
