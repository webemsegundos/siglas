<?php
header('Content-Type: application/json; charset=utf-8');
$retorno = array();

$m = new MongoClient();
$db = $m->siglas; 
$collection = new MongoCollection($db, 'siglas');

if(isset($_GET["busca"])) {
	$cursor = $collection->find(array("sigla"=> new MongoRegex('/'.$_GET["busca"].'/i'), "aprovado"=>1))
			->sort(array('sigla' => 1));
			//->limit(12);
	$retorno = iterator_to_array($cursor);
	echo json_encode($retorno);
}

?>