import * as yup from 'yup'

const ArticleSchema = {
  game: yup.string()
    .required('We need to know what the game is'),
  title: yup.string()
    .required('Tell us a title at least, come on')
    .min(10, 'No, that\'s too short')
    .max(70, 'No, that\'s too long'),
  excerpt: yup.string()
    .required('didn\'t your mother teach you to write an excerpt when you submit an article?')
    .min(20, 'Was hoping to see a little more honest exerption here')
    .max(100, 'Hold off on those strenuous excerptions it\'s too much'),
  editor: yup.string()
    .required('What is this game though')
    .min(50, 'That can\'t possibly be all there is')
    .max(500, 'You\'re blabbering, try to kep it concise'),
  rating: yup.number()
    .required('Rate it as well please')
    .notOneOf(['Select a rating'], 'You have to pick one of the ratings I\'m offering you'),
  img: yup.string()
    .required('And an image too please')
    .url('Well that\'s not a bloody URL now is it'),
  }

export default ArticleSchema
