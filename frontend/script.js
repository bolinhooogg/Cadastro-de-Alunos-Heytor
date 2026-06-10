const API = "http://localhost:3000";

let alunoEditando = null;

async function carregarAlunos() {

    const resposta = await fetch(`${API}/alunos`);
    const alunos = await resposta.json();

    const lista = document.getElementById("listaAlunos");

    lista.innerHTML = "";

    alunos.forEach(aluno => {

        lista.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.ra}</td>
                <td>${aluno.turma}</td>
                <td>${aluno.email}</td>

                <td>
                    <button
                        class="btn-editar"
                        onclick="editarAluno(
                            ${aluno.id},
                            '${aluno.nome}',
                            '${aluno.ra}',
                            '${aluno.turma}',
                            '${aluno.email}'
                        )"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirAluno(${aluno.id})"
                    >
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalAlunos").textContent = alunos.length;

    const turmas = [...new Set(alunos.map(a => a.turma))];

    document.getElementById("totalTurmas").textContent = turmas.length;
}

async function salvarAluno() {

    const nome = document.getElementById("nome").value;
    const ra = document.getElementById("ra").value;
    const turma = document.getElementById("turma").value;
    const email = document.getElementById("email").value;

    if (!nome || !ra || !turma || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    const dados = {
        nome,
        ra,
        turma,
        email
    };

    if (alunoEditando === null) {

        await fetch(`${API}/alunos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

    } else {

        await fetch(`${API}/alunos/${alunoEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        alunoEditando = null;
    }

    limparFormulario();
    carregarAlunos();
}

function editarAluno(id, nome, ra, turma, email) {

    alunoEditando = id;

    document.getElementById("nome").value = nome;
    document.getElementById("ra").value = ra;
    document.getElementById("turma").value = turma;
    document.getElementById("email").value = email;
}

async function excluirAluno(id) {

    if (!confirm("Deseja excluir este aluno?")) {
        return;
    }

    await fetch(`${API}/alunos/${id}`, {
        method: "DELETE"
    });

    carregarAlunos();
}

function limparFormulario() {

    document.getElementById("nome").value = "";
    document.getElementById("ra").value = "";
    document.getElementById("turma").value = "";
    document.getElementById("email").value = "";
}

carregarAlunos();