import Erros from './errors';

export default {
	campoStringNaoNulo(valor: string, nome: string) {
		if (typeof valor !== 'string')
			throw new Erros.InvalidArgumentError(
				`É necessário preencher o campo ${nome}!`
			);
	},

	campoTamanhoMinimo(valor: string, nome: string, minimo: number) {
		if (valor.length < minimo)
			throw new Erros.InvalidArgumentError(
				`O campo ${nome} precisa ser maior que ${minimo} caracteres!`
			);
	},

	campoTamanhoMaximo(valor: string, nome: string, maximo: number) {
		if (valor.length > maximo)
			throw new Erros.InvalidArgumentError(
				`O campo ${nome} precisa ser menor que ${maximo} caracteres!`
			);
	},
};
