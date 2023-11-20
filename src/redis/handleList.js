const handleList = (redisClient, prefix) => {
  return {
    async adiciona(chave, valor, dataExpiracao) {
      const key = prefix + chave;
      await redisClient.set(key, valor);
      redisClient.expireAt(key, dataExpiracao);
    },
    async buscaValor(chave) {
      const key = prefix + chave;
      return await redisClient.get(key);
    },
    async contemChave(chave) {
      const key = prefix + chave;
      const resultado = await redisClient.exists(key);
      return resultado === 1;
    },

    async deleta(chave) {
      const key = prefix + chave;
      await redisClient.del(key);
    },
  };
};

export default handleList;
