@extends('layouts.home')

@section('content')
<header class="py-5">
                <div class="container px-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xxl-6">
                            <div class="text-center my-5">
                                <h1 class="fw-bolder mb-3">Earn money from the comfort of home with your smartphones.</h1>
                                <p class="lead fw-normal text-muted mb-4"><span class="fw-bold">EAZYEARN</span> is an online Marketing Community built to help you take advantage of the internet and turn our everyday social media into a tool for Learning and Earning.</p>
                                <a class="btn btn-primary btn-lg" href="#scroll-target">Read our story</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- About section one-->
            <section class="py-5 bg-light" id="scroll-target">
                <div class="container px-5 my-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-lg-6"><img class="img-fluid rounded mb-5 mb-lg-0" src="{{asset('images/recast.jpg')}}" alt="..." /></div>
                        <div class="col-lg-6">
                            <h2 class="fw-bolder">Our Goal</h2>
                            <p class="lead fw-normal text-muted mb-0">An easier way to earn more into your bank account anytime any day. The goal is to give access to thousands of People to learn online and earn easily  irrespective of their status.</p>
                        </div>
                    </div>
                </div>
            </section>
            <!-- About section two-->
           
            <!-- Team members section-->
@endsection