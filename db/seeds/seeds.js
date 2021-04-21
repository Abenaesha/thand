const { usersData, ridesData, commentsData } = require("../data/index")
const { amendTimestamp, amendRideDate } = require("../utils/data-manipulation.js")

exports.seed = (knex) => {
	return knex.migrate
		.rollback()
		.then(() => {
			return knex.migrate.latest()
		})
		.then( () => {
			return knex("users").insert(usersData)
		} )
		.then( () => {
			const correctedTimestamp = amendRideDate( ridesData )
			return knex("rides").insert(correctedTimestamp)
		} )
		.then( () => {
			const correctedTimestamp = amendTimestamp( commentsData )
			return knex("comments").insert(correctedTimestamp)
		})
}
