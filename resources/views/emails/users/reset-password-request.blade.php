@component('mail::message')
<h2>{{$subject}}</h2>

<p>Hello {{ ucfirst($user->f_name) }} !</p>
<p>We have received a request to reset your password for your {{ config('app.name') }} account. Click bellow to reset it.</p>

@component('mail::button', ['url' => $url])
Reset Password
@endcomponent

<p>If you did not request a password reset, please ignore this email.</p>

Thanks,<br>
{{ config('app.name') }}
@endcomponent
