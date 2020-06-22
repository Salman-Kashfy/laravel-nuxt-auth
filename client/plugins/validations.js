$(function()
{
    $(document).on('keyup input','.alpha-only input',function()
    {
        if (this.value.match(/[^a-zA-Z]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z]/g, '');
        }
    });

    $(document).on('keyup input','.numeric-only',function()
    {
        if (this.value.match(/[^0-9]/g))
        {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    $('.date').on('keyup input',function()
    {
        if (this.value.match(/[^0-9 -]/g))
        {
            this.value = this.value.replace(/[^0-9 -]/g, '');
        }
    });

    $(document).on('keyup input','.numeric-with-fraction',function()
    {
        if (this.value.match(/[^0-9-/.]/g))
        {
            this.value = this.value.replace(/[^0-9-/.]/g, '').toFixed(2);
        }
    });

    $(document).on('keyup input','.alphanumeric-only',function()
    {
        if (this.value.match(/[^a-zA-Z0-9]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
        }
    });

    $(document).on('keyup input','.alpha-with-space',function()
    {
        if (this.value.match(/[^a-zA-Z ]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z ]/g, '');
        }
    });

    $('.numeric-with-space').on('keyup input',function()
    {
        if (this.value.match(/[^0-9 ]/g))
        {
            this.value = this.value.replace(/[^0-9 ]/g, '');
        }
    });

    $(document).on('keyup input','.alphanumeric-with-space',function()
    {
        if (this.value.match(/[^a-zA-Z0-9 ]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, '');
        }
    });

    $('.name').on('keyup input',function()
    {
        if (this.value.match(/[^a-zA-Z ]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z ]/g, '');
        }
    });

    $('.company-name').on('keyup input',function()
    {
        if (this.value.match(/[^a-zA-Z0-9 ]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, '');
        }
    });

    $('.design-name').on('keyup input',function()
    {
        if (this.value.match(/[^a-zA-Z0-9 _-]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z0-9 _-]/g, '');
        }
    });

    $(document).on('keyup input','.email',function()
    {
        if (this.value.match(/[^a-zA-Z0-9 _@.-]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z0-9 _@.-]/g, '');
        }
    });

    $('.description').on('keyup input',function()
    {
        if (this.value.match(/[^a-zA-Z0-9 _@.-]/g))
        {
            this.value = this.value.replace(/[^a-zA-Z0-9 ,.'-]/g, '');
        }
    });

    $('.design-colors').on('keyup input',function()
    {
        if (this.value.match(/[^0-9/-]/g))
        {
            this.value = this.value.replace(/[^0-9/-]/g, '');
        }
    });

    $('.design-width').on('keyup input',function()
    {
        if (this.value.match(/[^0-9./-]/g))
        {
            this.value = this.value.replace(/[^0-9./-]/g, '');
        }
    });

    $('.price').on('keyup input',function()
    {
        if (this.value.match(/[^0-9.]/g))
        {
            this.value = this.value.replace(/[^0-9.]/g, '');
        }
    });

});
$.jMaskGlobals = {
    maskElements: 'input,td,span,div',
    dataMaskAttr: '*[data-mask]',
    dataMask: true,
    watchInterval: 300,
    watchInputs: true,
    watchDataMask: false,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
        '0': {pattern: /\d/},
        '9': {pattern: /\d/, optional: true},
        '#': {pattern: /\d/, recursive: true},
        'A': {pattern: /[a-zA-Z0-9]/},
        'S': {pattern: /[a-zA-Z]/}
    }
};