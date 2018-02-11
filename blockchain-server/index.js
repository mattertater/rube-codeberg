var express = require('express')
var app = express()
var StellarSdk = require('stellar-sdk')
var sleep = require('sleep')

var bodyParser = require('body-parser')
var secret = require('./secret.js')

app.use(bodyParser.urlencoded({ extended: false }));


//Stellar Lumens Info
var sourceSecretKey = secret.secretKey;
var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
var sourcePublicKey = sourceKeypair.publicKey();


var receiverPublicKey = 'GCSYNM5JLH4D4KSEAQCSFQBRC5YDY4VS3RVAKSQOOTJQGBBK3KNEAWER'

var server = new StellarSdk.Server('https://horizon.stellar.org');
StellarSdk.Network.usePublicNetwork();

//Setup some stuff to track the monies
var transaction;
var isNewTransaction = false;
server.transactions()
	.forAccount(receiverPublicKey)
	.cursor('now')
	.stream({
		onmessage: function (message) {
			transaction = message;
			isNewTransaction = true;
		}
	})

app.get('/', function(req, res) {
	res.send("Hello World!")
})

//SEND SOME MONIES
app.get('/send', function(req, res) {
	if (!req.query.color) {
		req.query.color = "unknown";
	}
	server.loadAccount(sourcePublicKey)
	.then(function(account) {
		var transaction = new StellarSdk.TransactionBuilder(account)
		.addOperation(StellarSdk.Operation.payment({
			destination: receiverPublicKey,
			asset: StellarSdk.Asset.native(),
			amount: '0.0001',
		}))
		.addMemo(StellarSdk.Memo.text(req.query.color))
		.build();

		transaction.sign(sourceKeypair);
		console.log("Transaction Sending: " + transaction.toEnvelope().toXDR('base64'));

		server.submitTransaction(transaction)
			.then(function(transactionResult) {
				console.log("Transaction sent!: " + transactionResult.hash);
				//console.log(JSON.stringify(transactionResult, null, 2));
				//console.log('\nSuccess! View the transaction at: ');
				//console.log(transactionResult._links.transaction.href);
				res.send('<html><h1>Transaction sent on blockchain! Check out the nitty gritty below vvvvvv</h1><br><br><iframe width=100% height=100% frameborder="0" allowfullscreen scrolling="no" src="https://stellarchain.io/tx/' + transactionResult.hash + '"</iframe></html>');
			})
			.catch(function(err) {
			console.log('An error has occured:');
			console.log(err);
			res.send(err);
			});
	})
	.catch(function(e) {
	console.error(e);
	res.send(e);
	});

})

app.get('/receive', function(req, res) {
	//If there isn't a new transaction yet, just delay and refresh
	if (!isNewTransaction) {
		res.send('<html><meta http-equiv="refresh" content="20"/><h1>Nothing from the blockchain yet =(</h1></html>');
	}
	//WE GOT SOMETHIN
	else {
	isNewTransaction = false;
	res.send('<html><h1 style="color:' + transaction.memo + ';">BINGO.  The color is ' + transaction.memo + '.</h1></html>')
	}
})

app.listen(8080)
