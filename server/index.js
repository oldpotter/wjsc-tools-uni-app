const Koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')({multipart:true})
var cors = require('koa2-cors')
var Jimp = require('jimp');


const app = new Koa()

app.use(cors())

router.post('/jimp', koaBody, async(ctx) => {
	const {brightness, contrast} = ctx.request.body
	await Jimp.read(ctx.request.files.file.path)
			.then(img => {
			  img.brightness(parseFloat(brightness))
					.contrast(parseFloat(contrast))
					.normalize()
					.quality(10)
                  	// .write('1.jpg', () => {
                  	// 	ctx.body = 'ok' 
                  	// })
                  	.getBase64Async(Jimp.MIME_JPEG)
                  	// .writeAsync('2.jpg')
                  	.then(imgSrc=>{
                  		ctx.body = imgSrc
                  	})
			})
	
})

app.use(router.routes())

app.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})