import puppeteer from "puppeteer";

async function AbrirPaginaWeb () {
	const navegador = await puppeteer.launch({
		headless: false,
		slowMo: 400
	});

	const pagina = await navegador.newPage()

	await pagina.goto('http://facebook.com');
	await navegador.close();
}

// AbrirPaginaWeb();

async function capturaPantalla () {
	const navegador = await puppeteer.launch({
		headless: false,
		slowMo: 200
	});

	const pagina = await navegador.newPage()

	await pagina.goto('http://youtube.com')
	await pagina.setViewport({width: 1080, height: 1024});
	await pagina.screenshot({path: 'example.png'}) // TOMA CAPTURA DE PANTALLA, Y EL NOMBRE DEARCHIVO QUE GUARDARA LA CAPTURA
	await navegador.close();
}

// capturaPantalla()

async function navegarEntrePaginas () {
	const navegador = await puppeteer.launch({
		headless: false,
		slowMo: 100
	});

	const pagina = await navegador.newPage()

	await pagina.goto('https://quotes.toscrape.com')
	await pagina.click('a[href="/login"]')
	await new Promise(r => setTimeout(r, 3000))
	await navegador.close();
}

// navegarEntrePaginas();


async function obtenerDataDeLaPagina () {
	const navegador = await puppeteer.launch({
		headless: false,
		slowMo: 100
	});

	const pagina = await navegador.newPage()

	await pagina.goto('https://quotes.toscrape.com')
	const result = await pagina.evaluate(() => {
		const titulo = document.querySelector('h1').innerText
		const descripcion = document.querySelector('p').innerText
		const masinformacion = document.querySelector('a').innerText
		return {
			titulo,
			descripcion,
			masinformacion
		}
	})

	console.log(result)
	await navegador.close();
}

// obtenerDataDeLaPagina()

async function manejarDatosCambiantes() {
	const navegador = await puppeteer.launch({
		headless: false,
		slowMo: 100
	});

	const pagina = await navegador.newPage()

	await pagina.goto('https://quotes.toscrape.com')
	const result = await pagina.evaluate(() => {
		const quotes = document.querySelectorAll('.quote')
		const datos = [...quotes].map((quote) => {
			const textosquotes = quote.querySelector(".text").innerText;
			const authores = quote.querySelector(".author").innerText;
			const resenas = [...quote.querySelectorAll(".tag")].map((tags) => tags.innerText);

			return {
				textosquotes,
				authores,
				resenas
			}
		})
		return datos
	})

	console.log(result)
	// await navegador.close();
}

manejarDatosCambiantes()