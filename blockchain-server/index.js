var express = require('express')
var app = express()
var StellarSdk = require('stellar-sdk')

var bodyParser = require('body-parser')
var secret = require('./secret.js')

app.use(bodyParser.json());


//Stellar Lumens Info
var sourceSecretKey = secret.secretKey;
var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
var sourcePublicKey = sourceKeypair.publicKey();


var receiverPublicKey = 'GCSYNM5JLH4D4KSEAQCSFQBRC5YDY4VS3RVAKSQOOTJQGBBK3KNEAWER'

var server = new StellarSdk.Server('https://horizon.stellar.org');
StellarSdk.Network.usePublicNetwork();

server.loadAccount(sourcePublicKey)
	.then(function(account) {
var transaction = new StellarSdk.TransactionBuilder(account)
	.addOperation(StellarSdk.Operation.payment({
		destination: receiverPublicKey,
		asset: StellarSdk.Asset.native(),
		amount: '0.0001',
	}))
	.build();

	transaction.sign(sourceKeypair);
	console.log(transaction.toEnvelope().toXDR('base64'));

	server.submitTransaction(transaction)
		.then(function(transactionResult) {
			console.log(JSON.stringify(transactionResult, null, 2));
 		        console.log('\nSuccess! View the transaction at: ');
        		console.log(transactionResult._links.transaction.href);
		})
		.catch(function(err) {
		console.log('An error has occured:');
		console.log(err);
		});
	})
	.catch(function(e) {
	console.error(e);
	});
app.get('/', function(req, res) {

	res.send("Hello World!")
})

app.listen(8080)
