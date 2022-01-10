import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'


dayjs.locale('pt-br')

const getTodayInfo = () => dayjs().format('dddd, DD/MM')


export {
	getTodayInfo,
}
