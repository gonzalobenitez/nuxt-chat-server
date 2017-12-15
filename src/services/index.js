import channels from './channels'

export default function () {
  const app = this
  app.configure(channels)
}
