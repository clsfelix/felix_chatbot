import IMessage from "../interfaces/IMessage";


function getQuestion(message:string, info?:string):IMessage {

    const messages:{[key:string]: IMessage} = {
        hello: {
            text: 'Olá, eu sou Felix, tudo bem?',
            type: 'question'
        },
        whatYourName: {
            text:'Antes de começarmos, qual é o seu nome?',
            type:'question'
        },
        welcome: {
            text:`Que satisfação lhe atender ${info}`, 
            type:'question'
        }, 
        whatYourState: {
            text:'Agora que sei seu nome, poderia me informar de qual estado você é?', 
            type:'question'
        },
        whatYourCity: {
            text:'Certo! E de qual cidade você é?',
            type:'question'
        },
        whatYourBirthDay: {
            text:'Legal! Agora que sabemos sua cidade e estado, poderia compartilhar com a gente quando foi o dia do seu nascimento?', 
            type:'question'
        }, 
        whatYourEmail: {
            text:'Certo! Agora para que possamos entrar em contato com você, qual seu e-mail?', 
            type:'question'
        },
        congratulations: {
            text:'Chegamos ao final do cadastro! Aguarde um momento enquanto salvo suas informações.', 
            type:'question'
        },
        availableUs: {
            text:'Cadastro concluído! Queremos saber o que você achou. Pode fazer uma avaliação pra gente?',
            type:'question'
        }

        }

        return messages[message];
}

export enum questions {
    hello = 'hello',
    whatYourName = 'whatYourName',
    welcome='welcome',
    whatYourState='whatYourState',
    whatYourCity='whatYourCity',
    whatYourBirthDay='whatYourBirthDay',
    whatYourEmail='whatYourEmail',
    congratulations = 'congratulations',
    availableUs = 'availableUs'
}

export {
    getQuestion
}
