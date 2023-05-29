@extends('layouts.app')

@section('content')
<div >
    <div>
@error('error') 
<div class="alert alert-danger alert-dismissible fade show" role="alert" style="display: flex;flex-direction:row;align-items:center;width:max-content;max-width:100%;">
  <strong>Warning : </strong> &ensp;{{ $message}}
  <button type="button" class="close btn" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
@enderror
</div>
    <div id="withdrawal"></div>
</div>    

@endsection
