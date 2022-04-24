class InvalidArgumentError extends Error {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'InvalidArgumentError';
	}
}

class InternalServerError extends Error {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'InternalServerError';
	}
}

const errors = {
	InvalidArgumentError: InvalidArgumentError,
	InternalServerError: InternalServerError,
};

export default errors;
