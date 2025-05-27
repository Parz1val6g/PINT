/*==============================================================*/
/*                          DROP'S                              */
/*==============================================================*/
DROP TABLE IF EXISTS TRABALHO_SUBMETIDO;
DROP TABLE IF EXISTS SINCRONO;
DROP TABLE IF EXISTS NOTIFICACAO;
DROP TABLE IF EXISTS INSCRICAO;
DROP TABLE IF EXISTS DENUNCIA;
DROP TABLE IF EXISTS CONTEUDO_CURSO;
DROP TABLE IF EXISTS TIPO_CONTEUDO;
DROP TABLE IF EXISTS AVALIACAO_POST;
DROP TABLE IF EXISTS POST;
DROP TABLE IF EXISTS AVALIACAO_FORMADOR;
DROP TABLE IF EXISTS AVALIACAO;
DROP TABLE IF EXISTS FORMADOR;
DROP TABLE IF EXISTS FORMANDO;
DROP TABLE IF EXISTS ASSINCRONO;
DROP TABLE IF EXISTS CURSOS;
DROP TABLE IF EXISTS TOPICO;
DROP TABLE IF EXISTS GESTOR_ADMIN;
DROP TABLE IF EXISTS UTILIZADORES;
DROP TABLE IF EXISTS AREA;
DROP TABLE IF EXISTS CATEGORIA;
/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS CATEGORIA (
  ID SERIAL PRIMARY KEY,
  DESCRICAO text not null,
  DATA_CRIACAO timestamp not null,
  CONTEXTO text not null,
  NOME varchar(25) not null
);
/*==============================================================*/
/* Table: AREA                                                  */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS AREA (
  ID SERIAL PRIMARY KEY,
  CATEGORIA int not null,
  NOME varchar(25) not null,
  DESCRICAO text not null,
  DATA_CRIACAO timestamp not null,
  CONTEXTO text not null,
  constraint FK_AREA_AREA_CATE_CATEGORIA foreign key (CATEGORIA) references CATEGORIA (ID)
);
/*==============================================================*/
/* Table: UTILIZADORES                                          */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS UTILIZADORES (
  ID SERIAL PRIMARY KEY,
  NOME varchar(25) not null,
  TELEMOVEL int not null,
  EMAIL varchar(25) not null,
  PASSWORD varchar(25) not null,
  ENDERECO text not null,
  PAPEL varchar(25) not null,
  DATA_NASCIMENTO timestamp not null,
  SEXO char(1) not null,
  CRIACAO timestamp not null,
  PAPEL_DATE timestamp not null,
  DESCRICAO text not null
);
/*==============================================================*/
/* Table: GESTOR_ADMIN                                          */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS GESTOR_ADMIN (
  ID SERIAL,
  UTILIZADOR INT NOT NULL,
  N_CURSOS_CRIADOS INT NOT NULL,
  SCORE INT NOT NULL,
  CONSTRAINT PK_GESTOR_ADMIN PRIMARY KEY (UTILIZADOR, ID),
  -- Composite primary key
  CONSTRAINT FK_GESTOR_A_INHERITAN_UTILIZAD FOREIGN KEY (UTILIZADOR) REFERENCES UTILIZADORES (ID)
);
/*==============================================================*/
/* Table: TOPICO                                                */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS TOPICO (
  ID SERIAL PRIMARY KEY,
  CATEGORIA int not null,
  AREA int not null,
  DESCRICAO text not null,
  DATA_CRIACAO timestamp not null,
  CONTEXTO text not null,
  DENUNCIA_FLAG boolean not null,
  REWARD int not null,
  constraint FK_TOPICO_TOPICO_AR_AREA foreign key (AREA) references AREA (ID),
  constraint FK_TOPICO_TOPICO_CA_CATEGORI foreign key (CATEGORIA) references CATEGORIA (ID)
);
/*==============================================================*/
/* Table: CURSOS                                                */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS CURSOS (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int not null,
  GESTOR_ADMIN int not null,
  AREA int not null,
  CATEGORIA int not null,
  TOPICO int not null,
  NOME varchar(25) not null,
  DESCRICAO text not null,
  DURACAO float not null,
  DIA_INICIO timestamp not null,
  DIA_FIM timestamp not null,
  STATUS boolean not null,
  NIVEL varchar(25) not null,
  LINGUAGEM varchar(25) not null,
  TIPO varchar(25) not null,
  PROGRESSO int not null,
  OCORRENCIAS int not null,
  ABREVIACAO varchar(5) not null,
  VISIVEL_CURSOS boolean not null,
  ULTIMA_ATUALIZACAO timestamptz not null,
  N_FICHEIROS_MATERIAL int not null,
  N_FICHEIROS_AVALIACAO int not null,
  constraint FK_CURSOS_CURSO_GES_GESTOR_A foreign key (UTILIZADOR, GESTOR_ADMIN) references GESTOR_ADMIN (UTILIZADOR, ID),
  constraint FK_CURSOS_CURSO_TOP_TOPICO foreign key (TOPICO) references TOPICO (ID),
  constraint FK_CURSOS_CURSO_ARE_AREA foreign key (AREA) references AREA (ID),
  constraint FK_CURSOS_CATEGORIA_CATEGORI foreign key (CATEGORIA) references CATEGORIA (ID)
);
/*==============================================================*/
/* Table: ASSINCRONO                                            */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS ASSINCRONO (
  ID int not null,
  CURSO int not null,
  LINK_RECURSO varchar(25) not null,
  constraint PK_ASSINCRONO primary key (CURSO, ID),
  constraint FK_ASSINCRO_INHERITAN_CURSOS foreign key (CURSO) references CURSOS (ID)
);
/*==============================================================*/
/* Table: FORMANDO                                              */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS FORMANDO (
  ID int not null,
  UTILIZADOR int not null,
  GRAU_ACADEMICO varchar(25) not null,
  DATA_ENTRADA_EMPRESA timestamp not null,
  N_CURSOS_REALIZADOS int not null,
  SCORE int not null,
  PERCURSO_ACADEMICO text not null,
  constraint PK_FORMANDO primary key (UTILIZADOR, ID),
  constraint FK_FORMANDO_INHERITAN_UTILIZAD foreign key (UTILIZADOR) references UTILIZADORES (ID)
);
/*==============================================================*/
/* Table: FORMADOR                                              */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS FORMADOR (
  ID int not null,
  UTILIZADOR int not null,
  GRAU_ACADEMICO varchar(25) not null,
  N_CURSOS int not null,
  SCORE int not null,
  PERCURSO_ACADEMICO text not null,
  constraint PK_FORMADOR primary key (UTILIZADOR, ID),
  constraint FK_FORMADOR_INHERITAN_UTILIZAD foreign key (UTILIZADOR) references UTILIZADORES (ID)
);
/*==============================================================*/
/* Table: AVALIACAO                                             */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS AVALIACAO (
  ID SERIAL PRIMARY KEY,
  FOR_ID_UTILIZADOR int not null,
  FORMADOR int not null,
  UTILIZADOR int not null,
  FORMANDO int not null,
  NOTA int not null,
  OBSERVACAO varchar(60) null,
  DATA_AVALIACAO timestamp not null,
  N_HORAS_PRESENCA int not null,
  constraint FK_AVALIACA_FORMANDO__FORMANDO foreign key (UTILIZADOR, FORMANDO) references FORMANDO (UTILIZADOR, ID),
  constraint FK_AVALIACA_FORMADOR__FORMADOR foreign key (FOR_ID_UTILIZADOR, FORMADOR) references FORMADOR (UTILIZADOR, ID)
);
/*==============================================================*/
/* Table: AVALIACAO_FORMADOR                                    */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS AVALIACAO_FORMADOR (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int null,
  FORMANDO int null,
  FOR_ID_UTILIZADOR int not null,
  FORMADOR int not null,
  DATA_AVALIACAO timestamp not null,
  OBSERVACAO varchar(60) not null,
  AVALIACAO_FORMADOR float not null,
  constraint FK_AVALIACA_FORMADORE_FORMADOR foreign key (FOR_ID_UTILIZADOR, FORMADOR) references FORMADOR (UTILIZADOR, ID),
  constraint FK_AVALIACA_RELATIONS_FORMANDO foreign key (UTILIZADOR, FORMANDO) references FORMANDO (UTILIZADOR, ID)
);
/*==============================================================*/
/* Table: POST                                                  */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS POST (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int not null,
  AREA int not null,
  CATEGORIA int not null,
  TOPICO int not null,
  CURSO int not null,
  CONTEUDO varchar(25) not null,
  DATA_CRIACAO timestamp not null,
  DENUNCIA boolean not null,
  REWARD int not null,
  constraint FK_POST_UTILIZADO_UTILIZAD foreign key (UTILIZADOR) references UTILIZADORES (ID),
  constraint FK_POST_POST_TOPI_TOPICO foreign key (TOPICO) references TOPICO (ID),
  constraint FK_POST_POST_AREA_AREA foreign key (AREA) references AREA (ID),
  constraint FK_POST_POST_CATE_CATEGORI foreign key (CATEGORIA) references CATEGORIA (ID),
  constraint FK_POST_CURSO_POS_CURSOS foreign key (CURSO) references CURSOS (ID)
);
/*==============================================================*/
/* Table: AVALIACAO_POST                                        */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS AVALIACAO_POST (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int not null,
  POST int not null,
  AVALIACAO_POST boolean not null,
  OBSERVACAO varchar(60) not null,
  DATA_AVALIACAO timestamp not null,
  constraint FK_AVALIACA_AVALIACAO_UTILIZAD foreign key (UTILIZADOR) references UTILIZADORES (ID),
  constraint FK_AVALIACA_AVALIACAO_POST foreign key (POST) references POST (ID)
);
/*==============================================================*/
/* Table: TIPO_CONTEUDO                                         */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS TIPO_CONTEUDO (
  ID SERIAL PRIMARY KEY,
  NOME VARCHAR(50) not null UNIQUE,
  DESCRICAO varchar(25) not null
);
/*==============================================================*/
/* Table: CONTEUDO_CURSO                                        */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS CONTEUDO_CURSO (
  ID SERIAL PRIMARY KEY,
  TIPO_CONTEUDO int not null,
  CURSO int not null,
  DESCRICAO varchar(25) not null,
  DATA_UPLOAD timestamp not null,
  TAMANHO_FICHEIRO int not null,
  NOME varchar(25) not null,
  VISIVEL boolean not null,
  DISPONIBILIAZADO boolean not null,
  DURACAO_CONTEUDO timestamptz not null,
  constraint FK_CONTEUDO_CURSO_TEM_CURSOS foreign key (CURSO) references CURSOS (ID),
  constraint FK_CONTEUDO_TIPO_CONT_TIPO_CON foreign key (TIPO_CONTEUDO) references TIPO_CONTEUDO (ID)
);
/*==============================================================*/
/* Table: DENUNCIA                                              */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS DENUNCIA (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int not null,
  POST int not null,
  RAZAO varchar(25) not null,
  DATA_DENUNCIA timestamp not null,
  TIPO_DENUNCIA int not null,
  constraint FK_DENUNCIA_DENUNCIA__UTILIZAD foreign key (UTILIZADOR) references UTILIZADORES (ID),
  constraint FK_DENUNCIA_DENUNCIA__POST foreign key (POST) references POST (ID)
);
/*==============================================================*/
/* Table: INSCRICAO                                             */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS INSCRICAO (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int null,
  FORMANDO int null,
  CURSO int not null,
  AVALIACAO int not null,
  DATA_INSCRICAO timestamp not null,
  CERTIFICADO_GERADO boolean not null,
  AVALIACAO_STATUS boolean not null,
  constraint FK_INSCRICA_FORMANDO__FORMANDO foreign key (UTILIZADOR, FORMANDO) references FORMANDO (UTILIZADOR, ID),
  constraint FK_INSCRICA_INSCRICAO_CURSOS foreign key (CURSO) references CURSOS (ID),
  constraint FK_INSCRICA_AVALIACAO_AVALIACA foreign key (AVALIACAO) references AVALIACAO (ID)
);
/*==============================================================*/
/* Table: NOTIFICACAO                                           */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS NOTIFICACAO (
  ID SERIAL PRIMARY KEY,
  UTILIZADOR int not null,
  CURSO int not null,
  TIPO varchar(25) not null,
  MENSAGEM varchar(25) not null,
  DATA_ENVIO timestamp not null,
  constraint FK_NOTIFICA_UTILIZADO_UTILIZAD foreign key (UTILIZADOR) references UTILIZADORES (ID),
  constraint FK_NOTIFICA_NOTIFICAC_CURSOS foreign key (CURSO) references CURSOS (ID)
);
/*==============================================================*/
/* Table: SINCRONO                                              */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS SINCRONO (
  ID int not null,
  CURSO int not null,
  UTILIZADOR int not null,
  FORMADOR int not null,
  VAGAS int not null,
  LINK_RECURSO varchar(25) not null,
  DATA_LIMITE_INSCRICAO timestamptz not null,
  PRESENCAS_AULA int not null,
  constraint PK_SINCRONO primary key (CURSO, ID),
  constraint FK_SINCRONO_SINCRONO__FORMADOR foreign key (UTILIZADOR, FORMADOR) references FORMADOR (UTILIZADOR, ID),
  constraint FK_SINCRONO_INHERITAN_CURSOS foreign key (CURSO) references CURSOS (ID)
);
/*==============================================================*/
/* Table: TRABALHO_SUBMETIDO                                    */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS TRABALHO_SUBMETIDO (
  ID SERIAL PRIMARY KEY,
  AVALIACAO int not null,
  CURSO int not null,
  UTILIZADOR int not null,
  FORMANDO int not null,
  OBSERVACAO varchar(60) null,
  NOTA int not null,
  constraint FK_TRABALHO_FORMANDO__FORMANDO foreign key (UTILIZADOR, FORMANDO) references FORMANDO (UTILIZADOR, ID),
  constraint FK_TRABALHO_TRABALHO__CURSOS foreign key (CURSO) references CURSOS (ID),
  constraint FK_TRABALHO_AVALIACAO_AVALIACA foreign key (AVALIACAO) references AVALIACAO (ID)
);