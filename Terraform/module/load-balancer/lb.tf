data "aws_route53_zone" "main_zone" {
    name = "soc-net.lat"
    private_zone = false
}


data "aws_lb" "backend_lb" {
    tags = {
        "elbv2.k8s.aws/cluster" = "priv-cluster-eks"
        "ingress.k8s.aws/stack" = "default/backend"
        "ingress.k8s.aws/resource" = "LoadBalancer"


    }
} 

data "aws_lb" "monitor_lb" {
    tags = {
        "elbv2.k8s.aws/cluster" = "priv-cluster-eks"
        "ingress.k8s.aws/stack" = "monitoring/grafana-ingress"
        "ingress.k8s.aws/resource" = "LoadBalancer"


    }
} 

resource "aws_route53_record" "backend_cname" {
    zone_id = data.aws_route53_zone.main_zone.id
    name = var.dns_lb
    type = "A"
    alias {
        name = data.aws_lb.backend_lb.dns_name
        zone_id = data.aws_lb.backend_lb.zone_id
        evaluate_target_health = false
    }
    
}


resource "aws_route53_record" "alb_monitor_cname" {
    zone_id = data.aws_route53_zone.main_zone.id
    name = var.dns_lb_monitoring
    type = "A"
    alias {
        name = data.aws_lb.monitor_lb.dns_name
        zone_id = data.aws_lb.monitor_lb.zone_id
        evaluate_target_health = false
    }
    
}
