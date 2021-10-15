# Questão 1
Imprime false pois o escopo da variável a são diferentes. A Variável a é redeclarada dentro da função, criando outro escopo para ela.

Uma solução para isso funcionar, seria retirar o var de dentro da função, dessa forma, como o var declara um escopo global, a variável a dentro da função seria a mesma que foi declarada fora da função.


# Questão 2
Mais um problema de escopo de variáveis. Nesse caso, variáveis definidas dentro de uma função só podem ser lidas dentro da mesma função. Poderia solucionar passando a variável por referencia, porém, em javascript, somente objetos (array, objetos e funções) são passados via referência.

# Questão 3
imprime "Index: 3" e "Elemento: undefined", nas 3x de cada interação do laço de repetição. Isso acontece pois o setTimeOut vai criar uma pequena pausa na execução do script, porém, o laço continuará sendo executado e quando o script voltar a executar o comando console.log, o laço já vai ter terminado sua execução, o indice (variável i) terá o valor 3, e no array "arr" não temos nenhum elemento com indice 3.

# Questão 4
Nesse caso, temos uma high order function em javascript. É uma função que retorna outra função. Quando chamamos "func = teste4()" ela executa a primeira função e retorna a função interna para a variável func e dentro do console.log func é executado como uma função, na qual recebeu do retorno da função "teste4()".

# Questão 5
A função shuffle recebe um array como parametro, e como falado numa questão anterior, arrays, objetos e funcoes são passados via referencia por padrão, em funções JavaScript. Porém, na função suffle(array) ela não retorna nenhum valor, apenas embaralha o array passado, dessa forma, quando se faz o if(suffle(array)) ele nunca irá retornar verdadeiro e nunca irá executar o console.log(array). 

Para solucionar, deve se tirar a condição do if. Outros problemas que poderiam ocorrer, é receber outros tipos de dados, ao invés de um array. Um objeto iria funcionar de forma inesperada, já que mesmo sendo passado via referencia, não iria produzir o efeito de ordenação, por causa dos indices. E se passar um texto, number ou outro, não irá funcionar pois não é passado via referencia e sim como valor, sofrendo a alteração apenas dentro da função.