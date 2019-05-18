const { User, Appointment } = require('../models')
const { Sequelize, Op } = require('sequelize')
const moment = require('moment')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async list (req, res) {
    const provider = await User.findByPk(req.session.user.id)

    return res.render('appointments/list', { provider })
  }

  async show (req, res) {
    const date = moment(parseInt(req.query.date))

    // TODO ver como trazer relações junto, se possivel
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          where: { id: Sequelize.col('Appointment.user_id') }
        }
      ],
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    return res.render('appointments/show', { appointments })
  }
}

module.exports = new AppointmentController()
