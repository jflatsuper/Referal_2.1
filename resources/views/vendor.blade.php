@extends('layouts.home')


@section('content')
<section class="py-5 bg-dark" id="scroll-target" style="min-height:90vh">
                <div class="container px-5 my-5">
<h2 class="fw-bolder pb-3 mb-3 text-light">EazyEarn Vendors</h2>
<div class="row gx-5">

@foreach ($vendor as $user)
    <div class="col-lg-4 mb-5">
          <div class="card h-100 shadow border-0">
                                <div class="card-body p-4">
                                    <a class="text-decoration-none link-dark stretched-link" href="{{ url($user->link?$user->link:'') }}" target="_blank"><h5 class="card-title mb-3">{{$user->username}}</h5></a>
                                    <p class="card-text mb-0 fw-bold ">Request Coupon Code</p>
                                </div>
                                <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div class="d-flex align-items-end justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle me-3" src="{{asset('images/whatsapp.png')}}" height="40px"/>
                                            <div class="small">
                                                <div class="fw-bold">{{$user->first_name}} {{$user->surname}}</div>
                                                <div class="badge bg-primary bg-gradient rounded-pill mb-2">Since {{date('d-m-Y', strtotime($user->created_at))}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                            </div>
                            </div>

                        
@endforeach
                       
                        
                    </div>
</div>

</section>
<!-- <section class="py-5 bg-light" id="scroll-target">
                <div class="container px-5 my-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-lg-6"><img class="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /></div>
                        <div class="col-lg-6">
                            <h2 class="fw-bolder">Coupon Checker</h2>
                            <p class="lead fw-normal text-muted mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est, ut esse a labore aliquam beatae expedita. Blanditiis impedit numquam libero molestiae et fugit cupiditate, quibusdam expedita, maiores eaque quisquam.</p>
                        </div>
                    </div>
                </div>
            </section> -->


@endsection    