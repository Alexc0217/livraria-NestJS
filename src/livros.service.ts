import { Injectable } from "@nestjs/common";
import { Livro } from "./livro.model"
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class LivrosService {
    constructor(
        @InjectModel(Livro)
        private livroModel: typeof Livro
    ){}

    async obterTodos(): Promise<Livro[]>{
        return this.livroModel.findAll();
    }

    async obterUm(id: number): Promise<Livro> {
        return this.livroModel.findByPk(id);
    }

    async criarLivro(livro: Livro) {
        this.livroModel.create(livro)
    }

    async alterarLivro(livro: Livro): Promise<[number, Livro[]]> {
        return this.livroModel.update(livro, {
            returning: true,
            where: {
                id: livro.id
            }
        });
    }

    async apagarLivro(id: number){
        const livro: Livro = await this.obterUm(id);
        livro.destroy();
    }
}