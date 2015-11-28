//Definición del modelo de Comment con validación

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Comment',
		{
			texto: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta comentario"}}
			},
			publicado: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		},
		//Se añaden nuevos metodos segun la documentación
		{
			classMethods: {
				countDistinctQuizId: function() {
					return this.aggregate('QuizId', 'count', { distinct: true });
				},
				countPublished: function() {
					return this.count({where:{ publicado: true }});
				}
			}
		}
	);
}