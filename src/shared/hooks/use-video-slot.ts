// OBSOLETO — substituído por `use-video-pool.ts`.
//
// Esta versão deixava UM vídeo tocar no site inteiro. Evitava travamento, mas
// congelava tudo o que não fosse o item da vez: a grade e os cards de serviço
// ficavam parados e o site parecia quebrado. O pool novo permite quatro
// simultâneos e libera vaga no hover.
//
// Pode apagar este arquivo (está no LIMPAR.sh).
export {};
