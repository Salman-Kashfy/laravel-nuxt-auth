@component('mail::message')
<h2>{{$subject}}</h2>

<p>Hello {{ ucfirst($user->f_name) }} !</p>
<p>Thanks for signing up with {{ config('app.name') }}. To use your account, you’ll first need to confirm your email by clicking the link below.</p>

@component('mail::button', ['url' => $url])
Confirm Your Email
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
