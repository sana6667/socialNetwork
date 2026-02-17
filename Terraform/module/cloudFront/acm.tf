data "aws_route53_zone" "main_zone" {
    name = "soc-net.lat"
    private_zone = false
}



resource "aws_acm_certificate" "cert" {
    domain_name = var.conf_cloudFron.dns_name
    validation_method = "DNS"
    subject_alternative_names = [
        var.conf_cloudFron.sub_dns,
        var.conf_cloudFron.sub_dns_alb
    ]
}



resource "aws_route53_record" "cn_cdn" {
    zone_id = data.aws_route53_zone.main_zone.id
    name = var.conf_cloudFron.sub_dns
    type = "CNAME"
    ttl = 300
    records = [aws_cloudfront_distribution.cdn.domain_name]
}

resource "aws_route53_record" "cert_validation" {
    for_each = {
        for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
            name = dvo.resource_record_name
            type = dvo.resource_record_type
            record = dvo.resource_record_value
        }
    }
    zone_id = data.aws_route53_zone.main_zone.zone_id
    name = each.value.name
    type = each.value.type
    ttl = 300
    records = [each.value.record]
}

resource "aws_acm_certificate_validation" "my_acm_valid" {
    certificate_arn = aws_acm_certificate.cert.arn
    validation_record_fqdns = [for r in aws_route53_record.cert_validation: r.fqdn]
}

