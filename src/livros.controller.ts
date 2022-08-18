import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Livro } from "./livro.model";
import { LivrosService } from "./livros.service";

@Controller('livros')
export class LivrosController{

    constructor(private livrosService: LivrosService){

    }

    @Get()
    async getAll(): Promise<Livro[]> {
        return this.livrosService.obterTodos();
    }

    @Get(':id')
    async findOne(@Param() params): Promise<Livro> {
        return this.livrosService.obterUm(params.id);
    }

    @Post()
    async create(@Body() livro: Livro) {
        this.livrosService.criarLivro(livro);
    }

    @Put()
    async update(@Body() livro: Livro): Promise<[number, Livro[]]> {
        return this.livrosService.alterarLivro(livro);
    }

    @Delete(':id')
    async delete(@Param() param){
        this.livrosService.apagarLivro(param.id);
    }
}