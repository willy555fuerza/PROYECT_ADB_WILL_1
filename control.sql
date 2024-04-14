

/* table usuarios*/

create table usuario(
       id_usuario integer primary key identity,
       nombres nvarchar(150) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
       apellidos nvarchar(150) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
       perfil nvarchar(20) COLLATE SQL_Latin1_General_CP1_CS_AS null,
       usuario nvarchar(100) COLLATE SQL_Latin1_General_CP1_CS_AS unique not null,
       contraseña nvarchar(200) COLLATE SQL_Latin1_General_CP1_CS_AS not null,
       foto image null,
       fecha_registro date not null,
       ultimo_login datetime2 not null,
       estado bit default(1),
);

INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, foto, fecha_registro, ultimo_login)
VALUES ('Admin', 'Admin', 'Administrador', 'willy', '$2a$12$p7nbpolyn/E1GV8EYzGgE.kssTEvozi7ncTLC3HAkQqBjxhqCbSRm', NULL, GETDATE(), GETDATE());
select * from usuario;







/* table ministerio*/

create table Ministerio(
	id integer primary key identity,
	nombre nvarchar(50) COLLATE SQL_Latin1_General_CP1_CS_AS unique  not null ,
	descripcion nvarchar(256) null,
	registro_fecha date not null,
	estado bit default(1)
);

insert into ministerio(nombre,descripcion,registro_fecha) values ('START','QUBYTESOFT','2022-01-13');
select * from ministerio;


/* table miembro*/






--tabla miembro
create table miembro
(
	id_miembro integer primary key identity,
	nombre_miembro nvarchar(100) COLLATE SQL_Latin1_General_CP1_CS_AS unique  not null ,
	apellidos nvarchar(256) COLLATE SQL_Latin1_General_CP1_CS_AS null,
    ci integer null,
	fecha_naci date not null,
	estado bit default(1)
);

select * from miembro;

insert into miembro(nombre_miembro,apellidos,ci,fecha_naci) 
values ('Miguel','lopez','7867544','2022-01-15');